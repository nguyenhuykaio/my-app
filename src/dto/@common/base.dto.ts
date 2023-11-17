

export class RemoveImageDto {

  urlImage: string;
}

export class IdNumberReq {

  id: number;
}
export class UUIDReq {

  id: string;
}

export class MultipartFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number
}

export interface PrimaryBaseEntity {
  id?: string;
  createdDate?: Date;
  updatedDate?: Date;
  createdBy?: string | null;
  updatedBy?: string | null;
  version?: number;
}

export class PageRequest {
  pageSize?: number;
  pageIndex = 1;
}

export class PageResponse<T = any> {
  data: T[] = [];
  total: number = 0;
}
export class AddressReq {

  address: string;
}
