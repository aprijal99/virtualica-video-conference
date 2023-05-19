package virtualica.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rooms")
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    private String id;
    private RoomStatus roomStatus;
    @ManyToOne @JoinColumn(name = "owner")
    private User owner;
}
