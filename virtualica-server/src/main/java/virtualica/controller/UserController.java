package virtualica.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import virtualica.dto.UserDto;
import virtualica.entity.User;
import virtualica.service.UserService;
import virtualica.util.ApiResponse;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/user")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserController {
    private final UserService userService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUser(@RequestParam(name = "email") String email) {
        User user = userService.findUserByEmail(email);
        UserDto userDto = userService.entityToDto(user);

        return ResponseEntity.status(HttpStatus.FOUND)
                .body(ApiResponse.jsonWithData(HttpStatus.FOUND, userDto));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> userSignup(@RequestBody UserDto userDto) {
        User user = userService.dtoToEntity(userDto);
        userService.saveUser(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.jsonNoData(HttpStatus.CREATED));
    }
}
