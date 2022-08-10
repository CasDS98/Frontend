import { useForm, FormProvider } from "react-hook-form";
import {useCallback } from "react";
import LabelInput from "../components/LabelInput";
import { useGroups } from "../contexts/GroupsProvider";
import { useSession } from '../contexts/AuthProvider';

const validationRules = {
  groupName: {
    required: "Group name can not be empty",
    maxLength: { value: 255, message: "Group name must be 255 characters or less" },
  }
};

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
       
        await addMember(
          group.id,
          user.id
        );
        
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
      <div  class="p-4 dark:bg-gray-800 ">
        <form class="flex flex-row" onSubmit={handleSubmit(onSubmit)}>
          <LabelInput
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg rounded-r-none focus:ring-blue-500 focus:border-blue-500  min-w-full  p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label="groupName"
              type="text"
              defaultValue=""
              placeholder="Enter group name"
              validation={validationRules.groupName}
              data-cy="user_input"
            />
            <button class="relative inline-flex items-center justify-center p-1 mb-2 mr-0 overflow-hidden text-sm font-medium text-gray-900 rounded-lg rounded-l-none group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span class="relative px-2 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Create&nbsp;Group
              </span>
            </button>
  
        </form>
        </div>
    </FormProvider>
  )
  
}

export default CreateGroupForm;