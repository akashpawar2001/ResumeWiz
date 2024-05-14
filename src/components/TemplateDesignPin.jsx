import React, { useState } from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import {
  BiFolderPlus,
  BiHeart,
  BiSolidFolderMinus,
  BiSolidHeart,
} from "react-icons/bi";
import useUser from "../hooks/useUser";
import { saveToCollections, saveToFavourites } from "../api";
import useTemplates from "../hooks/useTemplates";
import { useNavigate } from "react-router-dom";

function TemplateDesignPin({ data, index }) {
  const { data: user, refetch: userRefetch } = useUser();
  const { refetch: templatesRefetch } = useTemplates();

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  async function addToCollection(e) {
    e.stopPropagation();
    await saveToCollections(user, data);
    userRefetch();
  }
  async function addToFavourite(e) {
    e.stopPropagation();
    await saveToFavourites(user, data);
    templatesRefetch();
  }

  function handleRouteNavigation() {
    navigate(`/resumeDetail/${data?._id}`, { replace: true });
  }
  return (
    <motion.div
      key={data?._id}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ delay: index * 0.3, ease: easeInOut }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleRouteNavigation}
        className="w-full h-[400px] 2xl:h-[750px] rounded-lg bg-gray-200 overflow-hidden relative px-5"
      >
        <motion.img
          src={data?.imageUrl}
          className="w-full h-full object-contain"
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col items-center justify-start z-50 px-3 py-3 cursor-pointer"
            >
              <div className="flex flex-col items-end justify-start w-full gap-4">
                <InnerBoxCard
                  Label={
                    user?.collections?.includes(data?._id)
                      ? "Already added"
                      : "Add to collections"
                  }
                  Icon={
                    user?.collections?.includes(data?._id)
                      ? BiSolidFolderMinus
                      : BiFolderPlus
                  }
                  onHandle={addToCollection}
                />
                <InnerBoxCard
                  Label={
                    data?.favourites?.includes(user.uid)
                      ? "Already Added"
                      : "Add To Favourites"
                  }
                  Icon={
                    data?.favourites?.includes(user.uid)
                      ? BiSolidHeart
                      : BiHeart
                  }
                  onHandle={addToFavourite}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const InnerBoxCard = ({ Label, Icon, onHandle }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onHandle}
      className="border rounded p-1 bg-gray-200 flex items-center justify-center hover:shadow-md relative"
    >
      <Icon className="text-gray-500 text-xl" />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.6, x: 50 }}
            className="absolute px-3 py-2 bg-gray-200 rounded-md -left-40 after:w-2 after:h-2 after:bg-gray-200 after:absolute after:-right-1 after:rotate-45 after:top-[14px]"
          >
            <p className="text-sm whitespace-nowrap">{Label}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplateDesignPin;
