export interface User {
  id: String
  createdAt: String
  username: String
  password: String
  products: Product[]
};

export interface Product {
  id: String
  createdAt: String
  name: String
  belongsTo: User
  belongsToId: User['id']
}
