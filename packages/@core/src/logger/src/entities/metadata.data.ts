import { AppContextData } from '@middleware/entities'

export type ApplicationData = {
  name: string
}

export interface ClassData {
  name: string
}
export type MetaData = {
  context?: AppContextData
  classData?: ClassData
  application?: ApplicationData
  functionName?: string
}
