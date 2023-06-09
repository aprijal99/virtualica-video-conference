package virtualica.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RoomDto {
    private String roomId;
    private String roomName;
    private String roomDescription;
    private Boolean roomStatus;
    private String ownerName;
    private String ownerEmail;
    private Long createdAt;
}
