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
    images: {
      imageId: string;
      url: string;
      created_at: string;
      updated_at: string;
    };
    category: {
      categoryId: string;
      name: string;
      parent_id: string;
      created_at: string;
      updated_at: string;
    };
    type: {
      productTypeId: string;
      tag: string;
      created_at: string;
      updated_at: string;
    };
    subs: any[];
  }
  