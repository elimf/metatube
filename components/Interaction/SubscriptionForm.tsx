import React from "react";
import { useForm } from "react-hook-form";

interface SubscriptionFormProps {
  isSubscribed: boolean;
  channelId: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  isSubscribed,
}) => {
  const { register } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Faire quelque chose avec les données du formulaire
  };

  return (
    <form>
      <div className="relative ml-4">
        <select
          {...register("channel", {
            value: isSubscribed ? "subscribe" : "unsubscribe",
            onChange: (e) => onSubmit(e),
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white"
        >
          <option value="subscribe">Subscribe</option>
          <option value="unsubscribe">Unsubscribe</option>
        </select>
      </div>
    </form>
  );
};

export default SubscriptionForm;
