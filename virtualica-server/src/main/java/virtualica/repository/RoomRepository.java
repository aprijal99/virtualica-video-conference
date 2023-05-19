package virtualica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import virtualica.entity.Room;

public interface RoomRepository extends JpaRepository<Room, String> {
}
