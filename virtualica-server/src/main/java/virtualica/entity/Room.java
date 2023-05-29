package virtualica.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

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
    private String roomName;
    private String roomDescription;
    private Boolean roomStatus;
    @ManyToOne @JoinColumn(name = "owner")
    private User owner;
    private Timestamp createdAt;
}
