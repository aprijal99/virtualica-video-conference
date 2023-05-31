package virtualica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import virtualica.entity.Room;
import virtualica.entity.User;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, String> {
    Optional<List<Room>> findRoomsByOwner(User owner);
}
