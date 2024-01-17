import { apiRefresh } from "@/api/auth/refresh";
import { apiSubscribeManager } from "@/api/interaction/subscribe";
import { CreateSubscribeDto } from "@/types";
import { JwtTokenManager } from "@/utils/jwtManager";
import React, { useState, useEffect } from "react";

interface SubscriptionFormProps {
  isSubscribed: boolean;
  channelId: string;
  onSubscriptionChange?: (newSubscriptionStatus: boolean) => void;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  isSubscribed,
  channelId,
  onSubscriptionChange,
}) => {
  const [subscriptionAction, setSubscriptionAction] = useState(
    isSubscribed ? "subscribe" : "unsubscribe"
  );
  useEffect(() => {
   setSubscriptionAction(isSubscribed ? "subscribe" : "unsubscribe");
  }, [isSubscribed]);
  const tokenManager = new JwtTokenManager();
  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const formData: CreateSubscribeDto = {
        channelId: channelId,
      };
      const token = tokenManager.getToken() as string;

      const isTokenValid = await tokenManager.isTokenValid(token);

      if (!isTokenValid) {
        await apiRefresh();
      }

      const likeResponse = await apiSubscribeManager(token, formData);

      if (
        likeResponse.statusCode === 401 &&
        likeResponse.message === "Invalid JWT token"
      ) {
        await apiRefresh();
      }

      if (likeResponse.statusCode === 200 && onSubscriptionChange) {
        onSubscriptionChange(!isSubscribed);
      }
    } catch (error) {
      // Gestion des erreurs
      console.error("Erreur lors de la gestion du like :", error);
    }
  };

  return (
    <form>
      <div className="relative ml-4">
        <select
          value={subscriptionAction}
          onChange={handleSelectChange}
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
