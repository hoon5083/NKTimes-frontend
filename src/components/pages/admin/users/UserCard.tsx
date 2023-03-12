import { User } from "../../../../types/api";
import UserEditingForm from "./UserEditingForm";
import UserInfo from "./UserInfo";
import { useState } from "react";

interface Props {
  user: User;
  mutate: () => void;
}

function UserCard({ user, mutate }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (<div className="p-2 my-2 rounded-lg bg-cp-1">
    {isEditing ? (
      <UserEditingForm user={user} setIsEditing={setIsEditing} mutate={mutate} />
    ) : (<UserInfo user={user} isEditing={isEditing} mutate={mutate} setIsEditing={setIsEditing} />
    )}
  </div>);
}

export default UserCard;