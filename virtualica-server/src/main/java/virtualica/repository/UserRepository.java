package virtualica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import virtualica.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
}
