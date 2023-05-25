export interface Administration {
}

export interface UserList {
    id:string;
    first_name: string;
    last_name: string;
    is_suspended:string;
  }

  export interface DocumentList {
    id:string;
    uploader: string;
    document_status: string;
    original_file_name:string;
    file_no:string;
    document_keyword:string;
  }


  export interface Department {
    name: string;


}