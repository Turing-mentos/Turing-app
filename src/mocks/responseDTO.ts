export default function ResponseDTO(
  isSuccess: boolean,
  code: string,
  message: string,
  result: any,
) {
  return {
    isSuccess,
    code,
    message,
    result,
  };
}
