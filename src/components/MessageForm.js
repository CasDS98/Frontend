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
  const [message, setMessage] = useState('');

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
          message: message,
        });
        reset();
        setMessage("");
      } catch (error) {
        console.error(error);
      }
    },
    [
      createMessage,
      selectedGroupId,
      reset,
      message
    ]
  );

  return(
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="p-4 dark:bg-gray-800 ">
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
                setMessage(event.target.value)}}
            />
            <button type="submit" data-cy="submit_transaction">
               submit
              </button>
          </div>
        </form>
      </FormProvider>
    </div>
   
  );

}

export default MessageForm;