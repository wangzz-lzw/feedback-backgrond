import {
  BadRequestException,
  Controller,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as qrcode from 'qrcode';
import Result from '../interceptor/result.interceptor';
import { Public } from '../decorators/public.decorator';

const map = new Map<string, QrCodeInfo>();

type QrCodeStatus =
  | 'noscan' // 未扫码
  | 'scan-wait-confirm' // 已扫码，等待确认
  | 'scan-confirm' // 确认
  | 'scan-cancel' // 取消
  | 'expired'; // 过期
interface QrCodeInfo {
  status: QrCodeStatus;
  userInfo?: {
    userId: number;
  };
}

/**
 * @description: PC端获取二维码
 * @return {*}
 */
@Controller('qrcode')
export class QrcodeController {
  @Get('/create')
  @Public()
  async create() {
    const url = 'http://localhost:8000/h5Login';
    const qrcodeId = randomUUID();
    const qrcodeUrl = await qrcode.toDataURL(url);
    map.set(qrcodeId, {
      status: 'noscan',
    });
    const result = {
      qrcodeId,
      qrcodeUrl,
    };
    return Result.success(result);
  }

  /**
   * @description: PC端轮询获取
   * @return {*}
   */
  @Get('/getQrcodeStatus/:id')
  @Public()
  async getQrcodeStatus(@Param('id') id: string) {
    const info = map.get(id);
    if (info.status === 'scan-confirm') {
      return info.userInfo;
    }
    const result = {
      status: info.status,
    };
    return Result.success(result);
  }

  /**
   * @description: H5端修改二维码状态（扫码、确认登录）
   * @return {*}
   */
  @Post('/updateQrcodeStatus')
  @Public()
  async updateQrcodeStatus(qrcodeId: string, status: QrCodeStatus) {
    const info = map.get(qrcodeId);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = status;
    const result = {
      status: info.status,
    };
    return Result.success(result);
  }
}
