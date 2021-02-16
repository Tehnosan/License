package backend.domain;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Recipe implements Serializable {
    private Integer id;
    private String name;
    private String url;
    private String ingredients;
    private String quantities;
    private String steps;
}
