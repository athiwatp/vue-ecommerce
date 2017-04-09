/**
 * Created by Administrator on 2017/4/9.
 */
var gulp = require( 'gulp' );
var ftp = require( 'vinyl-ftp' );
var ftpConfig = require('./project.config.js').ftpConfig;

gulp.task( 'upload', function () {

  var conn = ftp.create( ftpConfig );

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src( 'dist/**', { base: '.', buffer: false } )
    .pipe( conn.newer( frpConfig.finalRemotePath ) ) // only upload newer files
    .pipe( conn.dest( frpConfig.finalRemotePath ) );
} );
