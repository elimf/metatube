"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Header from "@/components/Header/Header";
import React from "react";
import { ChannelCreate } from "@/types/channel";
import { apiChannelPost } from "@/api/channel/create";
import { JwtTokenManager } from "@/utils/jwtManager";
import showToast from "@/utils/toast";
import { useRouter } from "next/navigation";
import { apiRefresh } from "@/api/auth/refresh";
import withAuth from "@/utils/authManager";

const CreateChannelPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ChannelCreate>();
  const router = useRouter();
  const tokenManager = new JwtTokenManager();
  const token = tokenManager.getToken();
  const onSubmit: SubmitHandler<ChannelCreate> = async (data) => {
    clearErrors();

    const handleApiResult = async (result: {
      statusCode: any;
      message: string;
    }) => {
      switch (result.statusCode) {
        case 400:
          setError("channelName", { type: "server" });
          showToast(result.message, "warning");
          break;
        case 201:
          showToast(result.message, "success", () => router.push("/"));
          break;
        case 500:
          showToast(result.message, "error");
          break;
        default:
          break;
      }
    };

    if (token) {
      const result = await apiChannelPost(data, token);
      await handleApiResult(result);
    } else {
      showToast("An error has occurred, please try again later. ", "error");
      const refreshResult = await apiRefresh();

      if (refreshResult.statusCode === 200) {
        if (token) {
          const result = await apiChannelPost(data, token);
          await handleApiResult(result);
        } else {
          showToast("An error has occurred, please try again later. ", "error");
        }
      }
    }
  };

  return (
    <Header withSidebar={false}>
      <div className="min-h-screen w-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded shadow-md"
        >
          <h1 className="text-2xl text-black font-semibold mb-6">
            Create the name of your channel
          </h1>
          <p className="text-zinc-700 text-sm text-pretty mb-6">
            You can use your brand name or another name. An effective channel
            name should represent you and your content. You can change the name
            of your channel at any time.
          </p>
          <div className="mb-4">
            <label
              htmlFor="channelName"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Channel Name
            </label>
            <input
              {...register("channelName", {
                required: "Channel Name is required",
              })}
              type="text"
              id="channelName"
              name="channelName"
              className={`w-full border rounded px-3 py-2 text-black ${
                errors.channelName ? "border-red-500" : ""
              }`}
              placeholder="Enter your channel name"
            />
            {errors.channelName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.channelName.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Channel
          </button>
        </form>
      </div>
    </Header>
  );
};

export default withAuth(CreateChannelPage);
