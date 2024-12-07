import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Section from "../section-label";
import FormGenerator from "../forms";

type Props = {
  message: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const GreetingsMessage = ({ message, register, errors }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Section
        label="Greetings Message"
        message="Customize  your welcome message"
      />
      <div className="lg:w-[500px]">
        <FormGenerator
          register={register}
          errors={errors}
          lines={2}
          name="welcomeMessage"
          type="text"
          placeholder={message}
          inputType="textarea"
        />
      </div>
    </div>
  );
};

export default GreetingsMessage;
