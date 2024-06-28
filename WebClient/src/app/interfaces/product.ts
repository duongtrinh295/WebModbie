export interface Image {
    imageId: string;
    url: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Category {
    categoryId: string;
    name: string;
    parent_id: string | null;
    created_at: string;
    updated_at: string;
  }
  
  export interface Type {
    productTypeId: string;
    tag: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Product {
    commonProductId: string;
    title: string;
    price: number;
    description: string;
    quantity_of_goods: number;
    warranty: number;
    created_at: string;
    updated_at: string;
    code: number;
    images: Image;
    category: Category;
    type: Type;
    subs: any[];
  }
  