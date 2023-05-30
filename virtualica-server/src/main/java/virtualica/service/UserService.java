package virtualica.service;

import virtualica.dto.UserDto;
import virtualica.entity.User;

public interface UserService {
    void saveUser(User user);
    User findUserById(String id);
    User findUserByEmail(String email);
    User dtoToEntity(UserDto userDto);
    UserDto entityToDto(User user);
}
