import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

function NavigationItems({ categories }: { categories: string[] }) {
  return (
    <ul className={classes["navigation-items"]}>
      {categories.map((category) => {
        return (
          <NavigationItem
            key={category}
            link={category === "all" ? "/" : `/${category}`}
          >
            {category}
          </NavigationItem>
        );
      })}
    </ul>
  );
}

export default NavigationItems;
