// import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
// import { API_URL } from "./constants";
// export const { dataProvider, kyInstance } = createSimpleRestDataProvider({
//   apiURL: API_URL,
// });

import {
  BaseRecord,
  DataProvider,
  GetListParams,
  GetListResponse,
} from "@refinedev/core";

type Subject = {
  id: number;
  code: string;
  name: string;
  department: string;
  description: string;
};

const mockSubjects: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "CS",
    description:
      "Foundational course covering programming concepts, algorithms, and problem-solving techniques.",
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    department: "Math",
    description:
      "Study of integration methods, sequences, series, and applications of calculus in science and engineering.",
  },
  {
    id: 3,
    code: "ENG150",
    name: "Academic Writing",
    department: "English",
    description:
      "University writing course focused on research, argument development, citation, and clear academic style.",
  },
];

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
  }: GetListParams): Promise<GetListResponse<TData>> => {


    if(resource !== "subjects") {
      return {data: [] as TData[], total: 0}
  }
  return {
    data: mockSubjects as TData[],
    total: mockSubjects.length,
  }
},

getOne: async ()=> {throw new Error("This function is not present in mock data provider ")},
create: async ()=> {throw new Error("This function is not present in mock data provider ")},
update: async ()=> {throw new Error("This function is not present in mock data provider ")},
delete: async ()=> {throw new Error("This function is not present in mock data provider ")},

 getApiUrl:()=>'',
};

// Pagination
