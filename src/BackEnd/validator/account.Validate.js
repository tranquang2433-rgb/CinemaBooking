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
export function validateName(fullname) {
  const result = validationResult();
  if (typeof fullname !== "string") {
    result.valid = false;
    result.errors.push("Ten phai la chuoi");
    return result;
  }
  const fullnameTrim = fullname.trim().replace(/\s+/g, " ");
  if (fullnameTrim === "" || !fullnameTrim) {
    result.valid = false;
    result.errors.push("Ten khong duoc de trong hoac de khoan trang");
    return result;
  }
  if (fullnameTrim.length < 2 || fullnameTrim > 100) {
    result.valid = false;
    result.errors.push("Ten phai tu 2 ky tu tro len va toi da 100 ky tu");
    return result;
  }
  return result;
}
export function validateEmail(email) {
  const result = validationResult();
  if (!email || typeof email !== "string") {
    result.valid = false;
    result.errors.push("Email khong duoc de trong");
    return result;
  }
  const standardEmail = email.trim().toLowerCase();
  if (standardEmail.length === 0 || standardEmail.length > 254) {
    result.valid = false;
    result.errors.push("Email phai be hon 254 ky tu");
    return result;
  }
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(standardEmail)) {
    result.valid = false;
    result.errors.push("Email phai dung dinh dang");
    return result;
  }
  const index = standardEmail.lastIndexOf("@");
  const userPart = standardEmail.slice(0, index);
  const domainPart = standardEmail.slice(index + 1);

  if (userPart.length > 64) {
    result.valid = false;
    result.errors.push("Username cua Email phai duoi 64 ky tu");
    return result;
  }
  if (
    userPart.startsWith(".") ||
    userPart.startsWith("..") ||
    userPart.endsWith(".")
  ) {
    result.valid = false;
    result.errors.push("Username cua Email khong dung dinh dang");
    return result;
  }
  if (domainPart.length > 253) {
    result.valid = false;
    result.errors.push("Domain cua Email phai duoi 253 ky tu");
    return result;
  }
  const domainName = domainPart.split(".");
  if (domainName.length < 2) {
    result.valid = false;
    result.errors.push("Domain cua Email phai gom it nhan 2 phan");
    return result;
  }
  for (const name of domainName) {
    if (name.length === 0 || name.length > 63) {
      result.valid = false;
      result.errors.push("Domain cua Email phai tu 1 den 63 ky tu");
      return result;
    }
    if (name.startsWith("-") || name.endsWith("-")) {
      result.valid = false;
      result.errors.push(
        "Domain cua Email khong the bat dau va ket thuc bang dau -",
      );
      return result;
    }
    if (!/^[a-zA-Z0-9-]+$/.test(name)) {
      result.valid = false;
      result.errors.push("Domain cua Email chua ky tu khong phu hop");
      return result;
    }
  }
  const tld = domainName[domainName.length - 1];
  if (!/^[a-zA-Z]{2,}$/.test(tld)) {
    result.valid = false;
    result.errors.push("TLD cua Email chua ky tu khong phu hop");
    return result;
  }
  return result;
}

export function validatePassword(password) {
  const result = validationResult();
  if (typeof password !== "string" || password === undefined) {
    result.valid = false;
    result.errors.push("Password khong duoc de trong");
    return result;
  }
  if (password.length < 8 || password.length > 72) {
    result.valid = false;
    result.errors.push("Password phai tu 8 den 72 ky tu");
    return result;
  }
  return result;
}

export function validatePhone(phone) {
  const result = validationResult();
  if (typeof phone !== "string") {
    result.valid = false;
    result.errors.push("So dien thoai phai la chuoi");
    return result;
  }
  const phoneTrim = phone.trim();
  if (!/^[0-9]+$/.test(phoneTrim)) {
    result.valid = false;
    result.errors.push("So dien thoai khong duoc phep co chu");
    return result;
  }
  if (!phoneTrim.startsWith("0")) {
    result.valid = false;
    result.errors.push("So dien thoai phai bat dau tu so 0");
    return result;
  }
  if (phoneTrim.length !== 10) {
    result.valid = false;
    result.errors.push("So dien thoai phai du 10 so");
    return result;
  }
  return result;
}
