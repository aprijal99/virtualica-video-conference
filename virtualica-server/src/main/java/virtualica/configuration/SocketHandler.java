package virtualica.configuration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import virtualica.service.RoomService;
import virtualica.service.SessionService;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
@AllArgsConstructor
public class SocketHandler extends TextWebSocketHandler {
    private final SessionService sessionService;

    @Override
    protected void handleTextMessage(WebSocketSession webSocketSession, TextMessage textMessage) throws Exception {
        Map<String, Object> map = new ObjectMapper().readValue(textMessage.getPayload(), new TypeReference<>(){});
        String type = (String) map.get("type");
        String roomId = (String) map.get("roomId");
        String senderEmail = (String) map.get("userEmail");

        switch (type) {
            case "JOIN" -> sessionService.addSessionToRoom(webSocketSession, roomId, senderEmail);
            case "REQUEST" -> sessionService.sendRequestMessage(roomId, senderEmail, textMessage);
            case "OFFER", "CANDIDATE", "ANSWER" -> {
                String receiverEmail = (String) map.get("receiverEmail");
                sessionService.sendOfferCandidateAndAnswerMessage(roomId, receiverEmail, textMessage);
            }
        }
    }
}
