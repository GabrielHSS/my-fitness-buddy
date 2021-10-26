export type FoodNutrients = {
  nutrientName: string
  value: number
  unitName: string
}
export type Record = {
  foodNutrients: FoodNutrients[]
  description: string[]
}
export type Data = {
  dataType?: string
  key: string[]
  description: string[]
  foodCategory: string[]
  foodNutrients: FoodNutrients[]
}
