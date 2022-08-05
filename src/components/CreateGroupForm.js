import { useForm, FormProvider } from "react-hook-form";
import {useCallback } from "react";
import LabelInput from "../components/LabelInput";
import { useGroups } from "../contexts/GroupsProvider";
import { useSession } from '../contexts/AuthProvider';

const CreateGroupForm = ()  => {
  const methods = useForm();
  const { user } = useSession();

  const {
    handleSubmit,
    reset
  } = methods;

  const {
    createGroup,
    addMember
  } = useGroups();


  const onSubmit = useCallback(
    async (data) => {
      try {

        const group = await createGroup({
          name : data.groupName
        });
       
        await addMember({
          group_id : group.id,
          user_id : user.id
        });
        
        reset();
      } catch (error) {
        console.error(error);
      }
    },
    [
      createGroup,
      reset,
      addMember,
      user
    ]
  );

  return (
    <FormProvider {...methods}>
      <div  class="dark:bg-gray-800 ">
        <form onSubmit={handleSubmit(onSubmit)} className="m-5">
          <LabelInput
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  min-w-full  p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label="groupName"
              type="text"
              defaultValue=""
              placeholder="Enter group name"
              data-cy="user_input"
            />
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Create group
              </span>
            </button>
        </form>
      </div>
    </FormProvider>
  )
  
}

export default CreateGroupForm;