export function UsersList({ userNum }) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-1.5">
        <p className="text-gray-500">U{userNum}</p>
        <h6>User {userNum}</h6>
      </div>
      <button className="px-1.5 py-1 rounded-lg bg-black text-white hover:bg-gray-900 cursor-pointer hover:scale-[103%]">
        Send Money
      </button>
    </div>
  );
}
