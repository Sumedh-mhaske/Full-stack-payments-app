import { Balance } from "./components/Balance";
import { InputField } from "./components/InputField";
import { Navbar } from "./components/Navbar";
import { UsersList } from "./components/UsersList";

function App() {
  let counter = 0;
  return (
    <div className="flex flex-col m-2 gap-6">
      <Navbar />
      <Balance balance={5000} />
      <InputField />
      <UsersList userNum={(counter += 1)} />
      <UsersList userNum={(counter += 1)} />
      <UsersList userNum={(counter += 1)} />
    </div>
  );
}

export default App;
