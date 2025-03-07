export class CreateFeedbackDto {
  type: number;
  content: string;
  focusPage: string;
  phone?: string;
  qq?: string;
  fileData: string;
}
