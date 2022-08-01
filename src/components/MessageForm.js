import { useMessages } from "../contexts/MessagesProvider";
import { useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import LabelInput from "./LabelInput";;

const validationRules = {
  message: {
    required: "Message can not be emtpy",
    maxLength: { value: 300, message: "Message must be 300 characters or less" },
  }
};

const MessageForm = ()  => {
  //const [message, setMessage] = useState('');

  const methods = useForm();
  const {
    handleSubmit,
    reset,
  } = methods;

  const {
    createMessage,
    selectedGroupId
  } = useMessages();
  

  const onSubmit = useCallback(
    async (data) => {
      try {
        console.log(data);
        await createMessage({
          user_id: "23c1d4bb-2452-408c-b380-b61beed3d046",
          group_id: selectedGroupId,
          message: data.message,
        });
        reset();
        //setMessage("");
      } catch (error) {
        console.error(error);
      }
    },
    [
      createMessage,
      selectedGroupId,
      reset,
     // message
    ]
  );

  return(
    <div>
      <FormProvider {...methods}>
      <div  class="p-4 dark:bg-gray-800 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInput
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  min-w-full  p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label="message"
              type="text"
              defaultValue=""
              placeholder="type message"
              validation={validationRules.message}
              data-cy="message_input"
              onChange={event => {
                console.log(document.getElementById('message').value);
                console.log(event.target.value);
                //setMessage(event.target.value);
              }}
            />
             <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Submit
              </span>
            </button>
        </form>
        </div>
      </FormProvider>
    </div>
   
  );

}

export default MessageForm;