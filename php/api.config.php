<?php

require_once('Security.class.php');

// Users can be authenticated other ways, but this uses sesisons (will need to modify ArrestDB_Security::whitelist(...) if want to change)
if (session_id() == '') session_start();

$dsn = 'sqlite:../db.db';

class ArrestDB_Custom {
	public static function GET_DELETE() {

	}

	public static function PUT_POST() {
		ArrestDB::Serve('POST', '/(login)', function($table) {
			$response = ArrestDB::$CONFLICT;

			// Check ser and password passed
			if ( isset($_POST['user']) && isset($_POST['pass']) ) {

				// Check user + email
				$result = ArrestDB::Query('SELECT "userID", "pass" FROM "user" WHERE "user"=? OR "email"=?;', $_POST['user'], $_POST['user']);
				if (
					$result !== false &&
					count($result) === 1 &&
					Security::validate_password($_POST['pass'], $result[0]['pass'])
				) {
					$response = ArrestDB::$OK;
					$response['success']['userID'] = $result[0]['userID'];
				}
			}
			return ArrestDB::Reply( $response );
		});
	}
}

// Proposed user table column (store authenticated in session): access, type int
// My Convention (can be changed as desired)
//     0: Global
//     1: User
//     2: Admin
class ArrestDB_Security {

	// No value in whitelist assumes disabled call
	private static $WHITELIST = array(
		'login' => array(
			'0' => array(
				'actions' => array('POST'),
				// 'fields'  => a
			),
		),
		'user' => array(
			'2' => array(
				'actions' => array('GET', 'PUT', 'POST', 'DELETE'),
				'fields'  => array('userID', 'user', 'email', 'token', 'data'),
			),
		),
		'past' => array(
			// '2' => array(
			// 	'actions' => array('POST'),
			// 	'fields'  => array('userID', 'pass'),
			// ),
		),
	);

	public static function whitelist($table, $area) {
		$access = @$_SESSION['user']['access'];

		$result = array();
		if (array_key_exists($table, self::$WHITELIST)) {
			$access = isset($access) ? intval($access) : 0 ;

			// decrementing until we find 0 or some form of security
			while ( !array_key_exists($access, self::$WHITELIST[ $table ]) && $access > 0 ) $access--;

			// Make sure we didn't hit rock bottom
			if ( array_key_exists($access, self::$WHITELIST[ $table ]) ) $result = self::$WHITELIST[ $table ][ $access ][ $area ];
		}
		return $result;
	}
}
