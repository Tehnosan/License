package domain;

import java.io.Serializable;

public class Recipe implements Serializable {
    private Integer id;
    private String name;
    private String url;
    private String ingredients;
    private String quantities;
    private String steps;

    public Recipe() {
    }

    public Recipe(Integer id, String name, String url, String ingredients, String quantities, String steps) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.ingredients = ingredients;
        this.quantities = quantities;
        this.steps = steps;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getQuantities() {
        return quantities;
    }

    public void setQuantities(String quantities) {
        this.quantities = quantities;
    }

    public String getSteps() {
        return steps;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", url='" + url + '\'' +
                ", ingredients='" + ingredients + '\'' +
                ", quantities='" + quantities + '\'' +
                ", steps='" + steps + '\'' +
                '}';
    }
}
