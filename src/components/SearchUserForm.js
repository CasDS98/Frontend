import { useForm, FormProvider } from "react-hook-form";
import {useState, useEffect } from "react";
import LabelInput from "../components/LabelInput";
import {useUsers} from '../contexts/UsersProvider';

const SearchUserForm = ()  => {
  const methods = useForm();
  const { getUsersBySearch } = useUsers();

  const search = (value) =>{
    getUsersBySearch(value);
  }
  
  return (
    <FormProvider {...methods}>
      <div  class="dark:bg-gray-800 ">

          <LabelInput
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  min-w-full  p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label="searchUsers"
              type="text"
              defaultValue=""
              placeholder="Search users"
              onChange={(event)=>{search(event.target.value)}}
            />
      </div>
    </FormProvider>
  )
  
}

export default SearchUserForm;