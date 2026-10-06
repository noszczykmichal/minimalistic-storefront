import buildFormValidation from "@/utils/sharedValidation";

const fullSchema = buildFormValidation(["email", "password"]);

export default fullSchema;
