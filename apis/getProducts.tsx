interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
  longDescription: string;
}

export type StoreApiResponse = Product[];

export const getProducts = async (
  pageNumber: number,
  pageSize: number = 24
) => {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${pageSize}&offset=${
      pageSize * (pageNumber - 1)
    }`
  );
  const data: StoreApiResponse = await res.json();
  return data;
};

export const getProduct = async (id: number) => {
  if(id < 1 || Number.isNaN(id))
    return null
    
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${id}`
  );

  //due to res.json() throws when id is greater than last API item id
  const resAsText = await res.text();
  const data: Product | null = resAsText ? JSON.parse(resAsText) : null;
  return data;
}; 

export const getProductsCount = async () => {
  const OFFSET = 500;
  let data = await getProducts(1, OFFSET);
  if (data.length < OFFSET) {
    return data.length;
  }
  let start = 1;
  let end = 0;
  let current = 3;
  while (data.length === OFFSET || data.length === 0) {
    if (start + 1 === end) {
      return end * OFFSET;
    }

    data = await getProducts(current + 1, OFFSET);

    if (data.length === OFFSET) {
      start = current;
      end > start ? (current = Math.floor((start + end) / 2)) : (current *= 2);
    }

    if (data.length === 0) {
      end = current;
      current = Math.floor((start + end) / 2);
    }
  }
  return current * OFFSET + data.length;
};
