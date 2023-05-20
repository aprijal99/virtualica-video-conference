package virtualica.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomDto {
    private String roomId;
    private String roomName;
    private Boolean roomStatus;
    private String ownerName;
    private String ownerEmail;
    private Long createdAt;
}
