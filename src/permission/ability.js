import { Ability, AbilityBuilder } from "@casl/ability";
import { getStore } from "store";

const store = getStore();
// Defines how to detect object's type
function subjectName(item) {
  if (!item || typeof item === "string") {
    return item;
  }
  return item.__type;
}

const ability = new Ability([], { subjectName });

let currentAuth;
store.subscribe(() => {
  const prevAuth = currentAuth;
  currentAuth = store.getState().app.userInfo;
  if (prevAuth !== currentAuth) {
    ability.update(defineRulesFor(currentAuth));
  }
});

function defineRulesFor(auth) {
  const { can, rules } = new AbilityBuilder();
  if (auth.role === "admin") {
    can("access", "manage-user");
    can("access", "manage-request");
    can("access", "manage-server");
    can("access", "manage-customer");
  } else if (auth.role === "normal-user") {
  } else if (auth.role === "dc-member") {
    can("access", "manage-request");
    can("access", "manage-server");
  } else if (auth.role === "contact-point") {
    can("access", "manage-customer");
  }
  return rules;
}

export default ability;
