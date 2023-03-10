import { User } from "../../../../types/api";
import UserEditingForm from "./UserEditingForm";
import UserInfo from "./UserInfo";

interface Props {
  isDeleting: boolean;
  isEditing: boolean;
  user: User;
  mutate: () => void;
  setDeletingNum: (id: number) => void;
  setEditingNum: (id: number) => void;
}

function UserCard({ isDeleting, isEditing, user, setDeletingNum, setEditingNum, mutate }: Props) {

  return (<div className="p-2 my-2 rounded-lg bg-cp-1">
    {isEditing ? (
      <UserEditingForm user={user} setEditingNum={setEditingNum} mutate={mutate} />
    ) : (<UserInfo user={user} isDeleting={isDeleting} isEditing={isEditing} mutate={mutate}
                   setDeletingNum={setDeletingNum} setEditingNum={setEditingNum} />
    )}
  </div>);
}

export default UserCard;