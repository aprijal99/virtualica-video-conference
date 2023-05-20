package virtualica.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import virtualica.dto.RoomDto;
import virtualica.entity.Room;
import virtualica.entity.User;
import virtualica.repository.RoomRepository;

import java.sql.Timestamp;
import java.util.UUID;

@Service
@Transactional
@AllArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;

    @Override
    public String saveRoom(Room room) {
        room.setId(UUID.randomUUID().toString());
        room.setRoomStatus(false);
        roomRepository.save(room);

        return room.getId();
    }

    @Override
    public Room findRoomById(String roomId) {
        return roomRepository.findById(roomId).orElse(null);
    }

    @Override
    public void updateRoomStatus(String roomId) {
        Room room = this.findRoomById(roomId);
        room.setRoomStatus(!room.getRoomStatus());
        roomRepository.save(room);
    }

    @Override
    public void deleteRoom(String roomId) {
        roomRepository.deleteById(roomId);
    }

    @Override
    public Room dtoToEntity(RoomDto roomDto, User owner) {
        return Room.builder()
                .roomName(roomDto.getRoomName())
                .owner(owner)
                .createdAt(new Timestamp(roomDto.getCreatedAt()))
                .build();
    }

    @Override
    public RoomDto entityToDto(Room room) {
        return RoomDto.builder()
                .roomId(room.getId())
                .roomName(room.getRoomName())
                .roomStatus(room.getRoomStatus())
                .ownerName(room.getOwner().getName())
                .ownerEmail(room.getOwner().getEmail())
                .createdAt(room.getCreatedAt().getTime())
                .build();
    }
}
