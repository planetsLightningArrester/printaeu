import { bold as b, dim as d, italic as i, print, reverse as r, underline as u } from "../printaeu.ts";

Deno.test(function ExternalModifiers() {
  print.showDate();

  print.setColorfulTimeStamp(false);
  print.showMs();
  print.green(`No way I'm gonna do ${b.on}this!!!`);
  print.gray(`${i.on}Believe me, you'll!${i.off} - he said. ${i.on}Check ${u.on}this${u.off} out`);
  print.underline.green(`${b.on}How?${d.off} - I thought`);
  print.log(`${b.on}Shot ${r.on}reverse${r.off} shot`);
});
