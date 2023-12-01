import qs from "qs";

const addressBaseUrl = "https://provinces.open-api.vn/api";

export const getListCity = addressBaseUrl + "/p";
export const getDetailCity = (cityCode: number) =>
  addressBaseUrl + "/p/" + cityCode + "?" + qs.stringify({ depth: 2 });
export const getDetailDistrict = (districtCode: number) =>
  addressBaseUrl + "/d/" + districtCode + "?" + qs.stringify({ depth: 2 });
