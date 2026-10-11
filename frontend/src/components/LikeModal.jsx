import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadingAnimation } from "./Loading";
import UserListModal from "./UserListModal";

// Render conditionally ({open && <LikeModal />}) so hooks always run in the same order
const LikeModal = ({ onClose, id }) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLikes() {
      try {
        const { data } = await axios.get("/api/post/" + id);
        // Agar direct array aa raha hai to data, nahi to data.likes check kar lena
        setValue(data.likes || data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchLikes();
  }, [id]);

  return (
    <UserListModal title="Likes" users={value} onClose={onClose} emptyText="No likes yet">
      {loading && (
        <div className="flex justify-center py-10 text-brand-600">
          <LoadingAnimation />
        </div>
      )}
    </UserListModal>
  );
};

export default LikeModal;
