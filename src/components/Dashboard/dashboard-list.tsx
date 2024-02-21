import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import ChannelAvatar from "@/components/Channel/channel-avatar";
import { Button } from "../ui/button";
import { Trash2, Pencil } from "lucide-react";
import axios from "axios";

interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  likes: number;
  createdAt: string;
  isPublished: boolean;
}

const DashBoardList: React.FC<Video> = ({
  _id,
  title,
  thumbnail,
  likes,
  createdAt,
  isPublished,
}) => {
  const [published, setPublished] = useState(isPublished);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const togglePublishedVideo = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/api/v1/videos/toggle/publish/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setPublished((prev) => !prev);
    } catch (error) {
      console.error("Error toggling published video:", error);
    }
  };

  const handleDelete = async () => {
    // TODO
  };

  const handleEdit = () => {
    //TODO
  };

  return (
    <div className="border-b-2 border-dotted">
      <div className="grid grid-cols-10 gap-4 p-2 items-center">
        <div className="text-lg text-white font-semibold">
          <Switch checked={published} onCheckedChange={togglePublishedVideo} />
        </div>
        <div
          className={`border rounded-3xl p-2 ${
            published ? "border-green-600" : "border-red-600"
          }`}
        >
          <h3
            className={`text-md text-center font-semibold ${
              published ? "text-green-600" : "text-red-600"
            }`}
          >
            {published ? "Published" : "Unpublished"}
          </h3>
        </div>

        <div className="col-span-5 grid grid-cols-3 items-center gap-2">
          <div className="col-span-1 justify-self-end">
            <ChannelAvatar avatar={thumbnail} />
          </div>
          <div className="col-span-2 justify-self-start">
            <h3 className="text-center text-lg text-white font-semibold">
              {title.length > 20 ? title.slice(0, 20) + "..." : title}
            </h3>
          </div>
        </div>

        <div>
          <p className="bg-green-500 inline-block  p-1 pl-3 pr-3 text-center rounded-full ">
            {likes} likes
          </p>
        </div>
        <h3 className="col-span-2 text-lg text-white font-semibold flex justify-around items-center">
          <div className="">
            <p className="text-center">{formatDate(createdAt)}</p>
          </div>
          <div className="flex gap-1">
            <Button onClick={handleDelete}>
              <Trash2 size={15} />
            </Button>
            <Button onClick={handleEdit}>
              <Pencil size={15} />
            </Button>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default DashBoardList;