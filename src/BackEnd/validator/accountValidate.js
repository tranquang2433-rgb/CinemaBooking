import { validationResult } from "./validateResult.js";
export function validateId(id) {
  const result = validationResult();
  if (typeof id !== "string") {
    result.valid = false;
    result.errors.push("Id phai la kieu chuoi");
    return result;
  }
  if (id.length === 0) {
    result.valid = false;
    result.errors.push("Can nhap Id");
    return result;
  }
  if (!/^[1-9]\d*$/.test(id)) {
    result.valid = false;
    result.errors.push("Id phai la so nguyen duong");
    return result;
  }
  const numId = Number(id);
  if (!Number.isSafeInteger(numId)) {
    result.valid = false;
    result.errors.push("So Id qua lon");
    return result;
  }
  return result;
}
