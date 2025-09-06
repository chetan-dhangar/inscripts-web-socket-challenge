type User = {
  id: number | string;
  name: string;
};

type UserListingTypes = {
  users: User[];
};

export default function UserListing({ users = [] }: UserListingTypes) {
  return (
    <div className="container mx-auto p-4 min-h-screen items-center justify-center">
      <h3 className="m-2">Listing of Items</h3>
      {users?.map((user: User, index: number) => (
        <div key={user.id} className="p-4 m-2 border rounded shadow">
          <h2 className="text-lg font-semibold">
            {index + 1}. {user.name}
          </h2>
        </div>
      ))}
    </div>
  );
}
