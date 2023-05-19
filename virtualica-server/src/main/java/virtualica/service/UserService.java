package virtualica.service;

import virtualica.entity.User;

public interface UserService {
    void saveUser(User user);
    User findUserById(String id);
}
