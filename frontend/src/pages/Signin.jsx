import { Heading } from "../components/Heading";
import { BottomWarning } from "../components/BottomWarning";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";

export function Signin() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder={"sumedh@gmail.com"} />
          <InputBox label={"Password"} placeholder={"123456"} />
          <div className="pt-4">
            <Button label={"Sign in"} />
          </div>
          <BottomWarning
            label={"Don't have an account"}
            to={"/Signup"}
            buttonText={"Sign up"}
          />
        </div>
      </div>
    </div>
  );
}
