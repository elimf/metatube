import React, { useState } from "react";
import Comment from "@/components/Comment/Comment";
import Image from "next/image";

const CommentsSection: React.FC = () => {
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        id: "user1",
        name: "Alice",
        avatar: "https://via.placeholder.com/400", // Replace with actual user avatar URL
      },
      commentText: "This video is very informative. I enjoyed it!",
      timestamp: 1642396800000,
      replies: [
        {
          id: "1-1",
          user: {
            id: "user2",
            name: "Bob",
            avatar: "https://via.placeholder.com/400", // Replace with actual user avatar URL
          },
          commentText:
            "I agree with you, Alice. The content is well-presented.",
          timestamp: 1642396800000,
        },
        {
          id: "1-2",
          user: {
            id: "user3",
            name: "Charlie",
            avatar: "https://via.placeholder.com/400", // Replace with actual user avatar URL
          },
          commentText: "The video quality is impressive. Great job!",
          timestamp: 1642396800000,
        },
      ],
    },
    {
      id: "2",
      user: {
        id: "user4",
        name: "David",
        avatar: "https://via.placeholder.com/400", // Replace with actual user avatar URL
      },
      commentText: "I found the topic intriguing. Keep up the good work!",
      timestamp: 1642396800000,
      replies: [
        {
          id: "2-1",
          user: {
            id: "user5",
            name: "Eve",
            avatar: "https://via.placeholder.com/400", // Replace with actual user avatar URL
          },
          commentText: "I learned a lot from watching this video. Thank you!",
          timestamp: 1642396800000,
        },
      ],
    },
  ]);

  const handleReply = (commentId: string, replyText: string) => {
    const newComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: `${commentId}-${
                comment.replies ? comment.replies.length + 1 : 1
              }`,
              user: {
                id: "CurrentLoggedInUser", // Replace with actual user data
                name: "Current User", // Replace with actual user data
                avatar: "https://via.placeholder.com/400", // Replace with actual user avatar URL
              },
              commentText: replyText,
              timestamp: Date.now(),
            },
          ],
        };
      }
      return comment;
    });

    setComments(newComments);
  };

  const handleCommentSubmit = () => {
    // Add logic to handle new comment submission
    const newCommentObject: Comment = {
      id: `${comments.length + 1}`,
      user: {
        id: "CurrentLoggedInUser", // Replace with actual user data
        name: "Current User", // Replace with actual user data
        avatar: "https://via.placeholder.com/400", // Replace with actual user avatar URL
      },
      commentText: newComment,
      timestamp: Date.now(),
    };

    setComments([...comments, newCommentObject]);
    setNewComment(""); // Clear the input after submitting
  };

  return (
    <div>
      {/* Input for new comment */}
      <div className="flex items-center mb-4">
        {/* Replace with actual user profile picture logic */}
        <Image
          src="https://via.placeholder.com/400"
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
          width={40}
          height={40}
        />
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        >
          Comment
        </button>
      </div>

      {/* Existing comments */}
      {comments.map((item) => (
        <Comment key={item.id} comment={item} onReply={handleReply} />
      ))}
    </div>
  );
};

export default CommentsSection;
